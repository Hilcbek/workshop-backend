import { PORT } from "./config/enviromental";
import { app } from "./config/express";
import { logger } from "./config/winston";

const start = () => {
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`)
    })
}
start()