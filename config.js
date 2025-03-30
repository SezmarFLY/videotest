export const config = {
    // Task types and their coefficients
    taskTypes: [
        { id: 1, name: 'Фоновое прослушивание подкаста', coefficient: 0.5, description: 'Прослушивание подкастов по маркетингу в фоновом режиме' },
        { id: 2, name: 'Просмотр видео по SEO', coefficient: 0.6, description: 'Обучающие видео по SEO-оптимизации' },
        { id: 3, name: 'Конспект вебинара', coefficient: 0.7, description: 'Составление конспекта по материалам вебинаров' },
        { id: 4, name: 'Чтение статьи о таргетинге', coefficient: 0.8, description: 'Изучение материалов о таргетированной рекламе' },
        { id: 5, name: 'Разбор кейса + конспект', coefficient: 0.9, description: 'Анализ кейсов и создание конспекта' },
        { id: 6, name: 'Настройка рекламной кампании', coefficient: 1.0, description: 'Шаблонная настройка рекламной кампании' },
        { id: 7, name: 'Исследование нового инструмента', coefficient: 1.1, description: 'Изучение новых инструментов аналитики' },
        { id: 8, name: 'Комплексный аудит сайта', coefficient: 1.2, description: 'Полный аудит сайта и составление отчета' },
        { id: 9, name: 'Маркетинговая стратегия', coefficient: 1.3, description: 'Разработка маркетинговой стратегии' }
    ],
    
    // Sample achievements
    achievements: [
        { 
            id: 1, 
            title: 'Первые шаги', 
            description: 'Выполните свою первую задачу', 
            icon: 'check-circle',
            unlocked: true
        },
        { 
            id: 2, 
            title: 'Продуктивность', 
            description: 'Выполните 5 задач за день', 
            icon: 'lightning-charge',
            unlocked: true
        },
        { 
            id: 3, 
            title: 'Стратег', 
            description: 'Выполните 10 задач типа "Маркетинговая стратегия"', 
            icon: 'graph-up',
            unlocked: false
        },
        { 
            id: 4, 
            title: 'SEO-гуру', 
            description: 'Выполните 20 задач по оптимизации', 
            icon: 'search',
            unlocked: false
        },
        { 
            id: 5, 
            title: 'Копирайтер', 
            description: 'Создайте 15 контент-материалов', 
            icon: 'pencil',
            unlocked: false
        }
    ],
    
    // Predefined task templates
    predefinedTemplates: [
        {
            id: 1,
            title: 'Анализ конкурентов',
            description: 'Комплексный анализ конкурентов в нише',
            type: 8,
            subtasks: [
                { title: 'Сбор данных по конкурентам', completed: false },
                { title: 'Сравнительный анализ метрик', completed: false },
                { title: 'Составление отчета', completed: false }
            ]
        },
        {
            id: 2,
            title: 'Написание SEO-статьи',
            description: 'Создание оптимизированной для поисковых систем статьи',
            type: 6,
            subtasks: [
                { title: 'Подбор ключевых слов', completed: false },
                { title: 'Составление структуры', completed: false },
                { title: 'Написание текста', completed: false },
                { title: 'SEO-оптимизация', completed: false },
                { title: 'Публикация и мониторинг', completed: false }
            ]
        },
        {
            id: 3,
            title: 'Аудит рекламных кампаний',
            description: 'Анализ эффективности текущих рекламных кампаний',
            type: 7,
            subtasks: [
                { title: 'Сбор данных по рекламным кампаниям', completed: false },
                { title: 'Анализ показателей эффективности', completed: false },
                { title: 'Выявление проблем и точек роста', completed: false },
                { title: 'Подготовка рекомендаций', completed: false }
            ]
        }
    ],
    
    // Sample tasks
    sampleTasks: [
        {
            id: 1,
            title: 'Анализ конкурентов для проекта X',
            type: 8,
            deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            estimatedTime: 180,
            progress: 35,
            status: 'in-progress',
            expanded: false,
            subtasks: [
                { id: 101, title: 'Сбор данных по конкурентам', completed: true },
                { id: 102, title: 'Сравнительный анализ метрик', completed: false },
                { id: 103, title: 'Составление отчета', completed: false }
            ]
        },
        {
            id: 2,
            title: 'Написание статьи "10 трендов SEO в 2023 году"',
            type: 6,
            deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            estimatedTime: 120,
            progress: 60,
            status: 'in-progress',
            expanded: false,
            subtasks: [
                { id: 201, title: 'Подбор ключевых слов', completed: true },
                { id: 202, title: 'Составление структуры', completed: true },
                { id: 203, title: 'Написание текста', completed: true },
                { id: 204, title: 'SEO-оптимизация', completed: false },
                { id: 205, title: 'Публикация и мониторинг', completed: false }
            ]
        },
        {
            id: 3,
            title: 'Прослушать подкаст о контент-маркетинге',
            type: 1,
            deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            estimatedTime: 60,
            progress: 0,
            status: 'in-progress',
            expanded: false
        },
        {
            id: 4,
            title: 'Настройка рекламы в Instagram для клиента Y',
            type: 6,
            deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            estimatedTime: 90,
            progress: 25,
            status: 'in-progress',
            expanded: false
        },
        {
            id: 5,
            title: 'Изучение нового инструмента аналитики Google Analytics 4',
            type: 7,
            deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            estimatedTime: 150,
            progress: 10,
            status: 'in-progress',
            expanded: false
        }
    ],
    
    // Recent transactions
    recentTransactions: [
        { id: 1, title: 'Завершен аудит сайта', amount: 120, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
        { id: 2, title: 'Выполнен анализ конкурентов', amount: 150, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
        { id: 3, title: 'Штраф за просрочку задачи', amount: -20, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
        { id: 4, title: 'Создание контент-плана', amount: 80, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() }
    ],
    
    // Coin history for profile
    coinHistory: [
        { 
            id: 1, 
            title: 'Награда за задачу', 
            description: 'Аудит сайта клиента X',
            amount: 120, 
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() 
        },
        { 
            id: 2, 
            title: 'Награда за задачу', 
            description: 'Анализ конкурентов',
            amount: 150, 
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() 
        },
        { 
            id: 3, 
            title: 'Штраф за просрочку', 
            description: 'Создание баннеров для рекламной кампании',
            amount: -20, 
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() 
        },
        { 
            id: 4, 
            title: 'Награда за задачу', 
            description: 'Создание контент-плана на месяц',
            amount: 80, 
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() 
        },
        { 
            id: 5, 
            title: 'Достижение разблокировано', 
            description: 'Первые шаги',
            amount: 50, 
            date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() 
        },
        { 
            id: 6, 
            title: 'Награда за задачу', 
            description: 'Настройка Google Analytics',
            amount: 90, 
            date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() 
        },
        { 
            id: 7, 
            title: 'Бонус за серию задач', 
            description: 'Выполнение 5 задач за день',
            amount: 100, 
            date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() 
        }
    ],
    
    // Stats data for analytics
    stats: {
        completedTasks: 42,
        completionRate: 84,
        timeEstimateAccuracy: 78,
        avgCompletionTime: 65,
        overdueTasks: 7,
        overdueRate: 14,
        totalEarnedCoins: 3250
    },
    
    // Completed tasks with time data for analytics
    completedTasksWithTime: [
        {
            id: 101,
            title: 'Аудит сайта клиента X',
            type: 8,
            estimatedTime: 180,
            actualTime: 195,
            completionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 102,
            title: 'Настройка рекламной кампании в Google Ads',
            type: 6,
            estimatedTime: 90,
            actualTime: 85,
            completionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 103,
            title: 'Анализ конкурентов в нише',
            type: 5,
            estimatedTime: 120,
            actualTime: 160,
            completionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 104,
            title: 'Создание контент-плана на месяц',
            type: 9,
            estimatedTime: 150,
            actualTime: 140,
            completionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 105,
            title: 'Прослушивание подкаста о SEO',
            type: 1,
            estimatedTime: 60,
            actualTime: 60,
            completionDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 106,
            title: 'Написание SEO-статьи',
            type: 6,
            estimatedTime: 120,
            actualTime: 180,
            completionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
    ],
    
    // Time optimization recommendations
    timeRecommendations: [
        'Для задач типа "Написание SEO-статьи" рекомендуется увеличить планируемое время на 20%, так как вы обычно затрачиваете больше времени, чем планируете.',
        'Задачи по аналитике лучше разбивать на более мелкие подзадачи для более точной оценки времени.',
        'Рекомендуем планировать не более 3 сложных задач в день для повышения продуктивности.',
        'Для задач типа "Прослушивание подкаста" ваши оценки времени очень точны, продолжайте в том же духе!',
        'Обратите внимание на высокий процент просроченных задач по настройке рекламных кампаний. Возможно, стоит выделять больше времени на этот тип задач.'
    ]
};

