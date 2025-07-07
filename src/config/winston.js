import {createLogger,transports, format} from 'winston'
const {colorize, combine, printf,timestamp, json} = format

const logger =createLogger({
    level : 'info',
    format : combine(
        colorize(), timestamp(),
        json()
    ),
    transports : [
        new transports.Console({
            format : combine(
                colorize(),
                printf(({ level, message}) => `${level}: ${message}`)
            )
        }),
        new transports.File({filename : 'error.log', level : 'error'}),
        new transports.File({ filename : 'app.log', level : 'info'})
    ]
})
export {logger}