Config = Config or {}


Config.UI = {
    colors = {
        main = "#09ffc1",
    },
    locale = {

    }
}

Config.DefaultSpawns = {
    {
        id = "Legion_Square",
        label = 'Legion Square',
        description = 'The heart of Los Santos, where all the action happens.',
        location = vec4(195.17, -933.77, 29.7, 144.5),
        ui = {
            top = "48.75%",
            left = "36.25%",
        }
    },
    {
        id = "Paleto_Bay",
        label = 'Paleto Bay',
        description = 'A quiet town with a lot of potential, perfect for a fresh start.',
        location = vec4(80.35, 6424.12, 31.67, 45.5),
        ui = {
            top = "47.25%",
            left = "75.25%",
        }
    },
    {
        id = "Motels",
        label = 'Motels',
        description = 'A cheap place to stay for the night, perfect for those who are on the run.',
        location = vec4(327.56, -205.08, 53.08, 163.5),
        ui = {
            top = "49.75%",
            left = "40%",
        }
    },
    {
        id = 'Mission_Row',
        label = 'Mission Row',
        description = 'Police Department located in the heart of Los Santos.',
        location = vec4(426.96, -981.24, 30.71, 81.65),
        ui = {
            top = "51%",
            left = "36%",
        }
    },
}


Config.Apartments = {
    {
        label = 'Del Perro Heights Apt',
        description = 'Enjoy ocean views far away from tourists and bums on Del Perro Beach.',
        interior = {
            ['DellPerroHeightsApt4'] = {
                index = 1,
                location = vec3(-1447.35, -537.84, 34.74),
            },
            ['DellPerroHeightsApt7'] = {
                index = 2,
                location = vec3(-1447.35, -537.84, 34.74),
            }
        },
        ui = {
            top = "32.25%",
            left = "38.25%",
        }
    },
    {
        label = '4 Integrity Way Apt',
        description = 'This is such an promosing neighborhood, you can literally see the construction from your window!',
        interior = {
            ['4IntegrityWayApt28'] = {
                index = 3,
                location = vec3(-59.4, -616.29, 37.36),
            },
            ['4IntegrityWayApt30'] = {
                index = 4,
                location = vec3(-47.52, -585.86, 37.95),
            },
        },
        ui = {
            top = "45%",
            left = "38%",
        }
    },
    {
        label = 'Richard Majestic Apt',
        description = 'This breathtaking luxury condo is a stone\'s throw from AKAN Records and a Sperm Donor Clinic.',
        interior = {
            ['RichardMajesticApt2'] = {
                index = 5,
                location = vec3(-936.15, -378.91, 38.96),
            }
        },
        ui = {
            top = "38%",
            left = "39.5%",
        }
    },
    {
        label = 'Tinsel Towers Apt',
        description = 'A picture-perfect lateral living experience in one of Los Santos most sought-after tower blocks.',
        interior = {
            ['TinselTowersApt42'] = {
                index = 6,
                location = vec3(-614.58, 46.52, 43.59),
            }
        },
        ui = {
            top = "41%",
            left = "41.5%",
        }
    },
}
