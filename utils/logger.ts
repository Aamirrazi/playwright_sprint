import fs from "fs";
import path from "path";

const logDirectory = path.join(process.cwd(), "test-results");
const logFilePath = path.join(logDirectory, "execution.log");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}
function writeLog(level: string, message: string, data?: any) {
  const timestamp = new Date().toLocaleTimeString();
  let logEntry = `[${timestamp}] [${level}] ${message}`;

  if (data) {
    logEntry += `\n${JSON.stringify(data, null, 2)}`;
  }
  console.log(logEntry);

  fs.appendFileSync(logFilePath, logEntry + "\n\n");
}

export const logger = {
  info(message: string, data?: any): void {
    writeLog("INFO", message, data);
  },

  apiRequest(method: string, url: string, body?: any): void {
    writeLog("API-REQ", `${method} ${url}`, body);
  },

  apiResponse(status: number, url: string, body?: any): void {
    writeLog("API-RES", `Status: ${status} from ${url}`, body);
  },

  error(message: string, errorObj?: any): void {
    writeLog("ERROR", message, errorObj);
  },
};
