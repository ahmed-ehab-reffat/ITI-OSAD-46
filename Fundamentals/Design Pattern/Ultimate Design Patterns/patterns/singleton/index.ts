import { LogLevel } from './log-level';
import { Logger } from './logger';

const logger = Logger.getInstance();

logger.setLogLevel(LogLevel.WARN);

logger.logError('Error occurred!');
logger.logInfo('This should be neglected!');
logger.logDebug('This should be neglected!');
logger.logWarn('Warn occurred!');
