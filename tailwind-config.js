tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            navy: '#0d2238',
                            navyLight: '#173656',
                            crimson: '#8a1523',
                            crimsonSoft: '#ab2131',
                            green: '#1a4332',
                            gold: '#b89047',
                            goldLight: '#d6aa5c',
                            surface: '#f8fafc',
                            surfaceCard: '#ffffff',
                            border: '#e2e8f0'
                        }
                    },
                    fontFamily: {
                        kufi: ['"Noto Kufi Arabic"', 'sans-serif'],
                        sans: ['"IBM Plex Sans Arabic"', 'sans-serif']
                    },
                    boxShadow: {
                        subtle: '0 2px 10px -2px rgba(13, 34, 56, 0.05), 0 1px 4px -1px rgba(13, 34, 56, 0.03)',
                        elevated: '0 10px 25px -4px rgba(13, 34, 56, 0.08), 0 4px 10px -2px rgba(13, 34, 56, 0.04)',
                        card: '0 4px 20px -2px rgba(13, 34, 56, 0.06)'
                    }
                }
            }
        }
