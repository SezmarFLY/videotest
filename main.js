import { createApp } from 'vue';
import { config } from './config.js';

const app = createApp({
    data() {
        return {
            activePage: 'dashboard',
            userCoins: 750,
            currentTasks: [],
            taskTypes: config.taskTypes,
            achievements: config.achievements,
            predefinedTemplates: config.predefinedTemplates,
            userTemplates: [],
            recentTransactions: config.recentTransactions,
            coinHistory: config.coinHistory,
            stats: config.stats,
            completedTasksWithTime: config.completedTasksWithTime,
            timeRecommendations: config.timeRecommendations,
            
            // Filters
            activeFilters: {
                status: null,
                type: null
            },
            searchQuery: '',
            
            // New task form
            newTask: {
                title: '',
                type: 1,
                deadline: '',
                estimatedTime: 60,
                splitToSubtasks: false,
                subtasks: []
            },
            
            // Complete task data
            currentTask: null,
            completeTaskData: {
                actualTime: 0
            }
        };
    },
    computed: {
        filteredTasks() {
            let tasks = this.currentTasks;
            
            // Apply status filter
            if (this.activeFilters.status) {
                tasks = tasks.filter(task => task.status === this.activeFilters.status);
            }
            
            // Apply type filter
            if (this.activeFilters.type) {
                tasks = tasks.filter(task => task.type === this.activeFilters.type);
            }
            
            // Apply search query
            if (this.searchQuery.trim()) {
                const query = this.searchQuery.toLowerCase();
                tasks = tasks.filter(task => 
                    task.title.toLowerCase().includes(query) || 
                    this.getTaskTypeName(task.type).toLowerCase().includes(query)
                );
            }
            
            return tasks;
        }
    },
    methods: {
        // UI Helpers
        getStatusBadgeClass(status) {
            return 'status-' + status;
        },
        
        getStatusText(status) {
            switch(status) {
                case 'in-progress': return 'В процессе';
                case 'completed': return 'Выполнено';
                case 'overdue': return 'Просрочено';
                default: return status;
            }
        },
        
        getTaskTypeName(typeId) {
            const type = this.taskTypes.find(t => t.id === typeId);
            return type ? type.name : 'Неизвестный тип';
        },
        
        getTaskTypeCoefficient(typeId) {
            const type = this.taskTypes.find(t => t.id === typeId);
            return type ? type.coefficient : 1.0;
        },
        
        formatDate(dateString) {
            if (!dateString) return 'Не указано';
            
            const date = new Date(dateString);
            return date.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        
        isOverdue(task) {
            if (task.status === 'completed') return false;
            
            const deadline = new Date(task.deadline);
            const now = new Date();
            return deadline < now;
        },
        
        calculatePenalty(task) {
            if (!this.isOverdue(task)) return 0;
            
            const deadline = new Date(task.deadline);
            const now = new Date();
            const diffDays = Math.floor((now - deadline) / (1000 * 60 * 60 * 24));
            
            // Max penalty is 70%
            return Math.min(diffDays * 10, 70);
        },
        
        calculateReward(task) {
            const baseReward = 100 * this.getTaskTypeCoefficient(task.type);
            let penalty = 0;
            
            if (this.isOverdue(task)) {
                penalty = this.calculatePenalty(task) / 100;
            }
            
            // Apply penalty to base reward
            let finalReward = baseReward * (1 - penalty);
            
            // Add bonuses for type 8 and 9 tasks
            if (task.type === 8 && task.subtasks) {
                finalReward += task.subtasks.length * 50; // Example bonus
            } else if (task.type === 9 && task.subtasks) {
                finalReward += task.subtasks.length * 100; // Double bonus
            }
            
            return Math.round(finalReward);
        },
        
        getTimeVarianceClass(task) {
            const variance = this.calculateTimeVariance(task);
            if (variance <= 10) return 'variance-good';
            if (variance <= 30) return 'variance-warning';
            return 'variance-bad';
        },
        
        calculateTimeVariance(task) {
            const estimated = task.estimatedTime;
            const actual = task.actualTime;
            
            if (estimated === 0) return 0;
            
            return Math.abs(Math.round(((actual - estimated) / estimated) * 100));
        },
        
        // Actions
        setFilter(filterType, value) {
            this.activeFilters[filterType] = value;
        },
        
        toggleTask(task) {
            task.expanded = !task.expanded;
        },
        
        toggleTaskCompletion(task) {
            if (task.status === 'completed') {
                task.status = 'in-progress';
            } else {
                this.openCompleteTaskModal(task);
            }
        },
        
        toggleSubtaskCompletion(task, subtask) {
            subtask.completed = !subtask.completed;
            
            // Update task progress
            if (task.subtasks && task.subtasks.length > 0) {
                const completedCount = task.subtasks.filter(st => st.completed).length;
                task.progress = Math.round((completedCount / task.subtasks.length) * 100);
            }
            this.saveToLocalStorage();
        },
        
        // Modal Handling
        openNewTaskModal() {
            // Reset form
            this.newTask = {
                title: '',
                type: 1,
                deadline: this.formatDateForInput(new Date(Date.now() + 24 * 60 * 60 * 1000)),
                estimatedTime: 60,
                splitToSubtasks: false,
                subtasks: []
            };
            
            // Show modal
            const modal = new bootstrap.Modal(document.getElementById('newTaskModal'));
            modal.show();
        },
        
        openEditTaskModal(task) {
            // TODO: Implement edit functionality
            console.log('Edit task:', task);
        },
        
        openCompleteTaskModal(task) {
            this.currentTask = task;
            this.completeTaskData.actualTime = task.estimatedTime || 60;
            
            const modal = new bootstrap.Modal(document.getElementById('completeTaskModal'));
            modal.show();
        },
        
        // Form Actions
        addSubtask() {
            this.newTask.subtasks.push({
                title: '',
                completed: false
            });
        },
        
        removeSubtask(index) {
            this.newTask.subtasks.splice(index, 1);
        },
        
        createTask() {
            const newTaskObj = {
                id: Date.now(),
                title: this.newTask.title,
                type: this.newTask.type,
                deadline: this.newTask.deadline,
                estimatedTime: this.newTask.estimatedTime,
                progress: 0,
                status: 'in-progress',
                expanded: false,
                subtasks: this.newTask.splitToSubtasks ? [...this.newTask.subtasks] : []
            };
            
            this.currentTasks.unshift(newTaskObj);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('newTaskModal'));
            modal.hide();
            
            // Show success message
            this.showToast('Задача успешно создана!');
            this.saveToLocalStorage();
        },
        
        completeTask() {
            if (!this.currentTask) return;
            
            // Update task
            this.currentTask.status = 'completed';
            this.currentTask.completionDate = new Date().toISOString();
            this.currentTask.actualTime = this.completeTaskData.actualTime;
            this.currentTask.progress = 100;
            
            // Complete all subtasks
            if (this.currentTask.subtasks) {
                this.currentTask.subtasks.forEach(subtask => {
                    subtask.completed = true;
                });
            }
            
            // Add reward
            const reward = this.calculateReward(this.currentTask);
            this.userCoins += reward;
            
            // Add to transactions
            this.recentTransactions.unshift({
                id: Date.now(),
                title: `Завершена задача: ${this.currentTask.title}`,
                amount: reward,
                date: new Date().toISOString()
            });
            
            // Add to coin history
            this.coinHistory.unshift({
                id: Date.now(),
                title: `Награда за задачу`,
                description: this.currentTask.title,
                amount: reward,
                date: new Date().toISOString()
            });
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('completeTaskModal'));
            modal.hide();
            
            // Show success message
            this.showToast(`Задача завершена! Получено ${reward} Анимонет`);
            
            // Update stats
            this.stats.completedTasks++;
            this.stats.totalEarnedCoins += reward;
            this.saveToLocalStorage();
        },
        
        saveAsTemplate(task) {
            // Create a copy of the task as a template
            const template = {
                id: Date.now(),
                title: task.title,
                description: `Шаблон на основе задачи "${task.title}"`,
                type: task.type,
                subtasks: task.subtasks ? [...task.subtasks].map(st => ({
                    title: st.title,
                    completed: false
                })) : []
            };
            
            this.userTemplates.push(template);
            
            // Show success modal
            const modal = new bootstrap.Modal(document.getElementById('templateSuccessModal'));
            modal.show();
            this.saveToLocalStorage();
        },
        
        useTemplate(template) {
            // Pre-fill new task form with template data
            this.newTask = {
                title: template.title,
                type: template.type,
                deadline: this.formatDateForInput(new Date(Date.now() + 24 * 60 * 60 * 1000)),
                estimatedTime: 60,
                splitToSubtasks: template.subtasks && template.subtasks.length > 0,
                subtasks: template.subtasks ? [...template.subtasks].map(st => ({
                    title: st.title,
                    completed: false
                })) : []
            };
            
            // Show new task modal
            const modal = new bootstrap.Modal(document.getElementById('newTaskModal'));
            modal.show();
        },
        
        deleteTemplate(template) {
            const index = this.userTemplates.findIndex(t => t.id === template.id);
            if (index !== -1) {
                this.userTemplates.splice(index, 1);
                this.showToast('Шаблон удален');
            }
            this.saveToLocalStorage();
        },
        
        // Utilities
        formatDateForInput(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        },
        
        showToast(message) {
            // Simple implementation - can be enhanced with a proper toast component
            alert(message);
        },
        
        saveToLocalStorage() {
            const dataToSave = {
                userCoins: this.userCoins,
                currentTasks: this.currentTasks,
                userTemplates: this.userTemplates,
                recentTransactions: this.recentTransactions,
                coinHistory: this.coinHistory,
                stats: this.stats,
                completedTasksWithTime: this.completedTasksWithTime
            };
            localStorage.setItem('questMarketerData', JSON.stringify(dataToSave));
        },
        
        loadFromLocalStorage() {
            const savedData = localStorage.getItem('questMarketerData');
            if (savedData) {
                const data = JSON.parse(savedData);
                this.userCoins = data.userCoins;
                this.currentTasks = data.currentTasks;
                this.userTemplates = data.userTemplates;
                this.recentTransactions = data.recentTransactions;
                this.coinHistory = data.coinHistory;
                this.stats = data.stats;
                this.completedTasksWithTime = data.completedTasksWithTime;
            } else {
                // Initialize with sample data if no saved data
                this.currentTasks = config.sampleTasks;
            }
        },
    },
    mounted() {
        // Load data from localStorage instead of using sample data
        this.loadFromLocalStorage();
        
        // Add event listener to save data when user leaves/refreshes the page
        window.addEventListener('beforeunload', () => {
            this.saveToLocalStorage();
        });
    }
});

app.mount('#app');