import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class DebugFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log("\n === 🔍 DEBUG ERROR START ===");
    console.log("Exception type:", exception.constructor.name);
    console.log("Message:", exception.message);
    console.log("Stack:", exception.stack);
    console.log(" === 🔍 DEBUG ERROR END ===\n");

    throw exception; // rethrow normally
  }
}
