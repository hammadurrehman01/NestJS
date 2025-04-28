import { All, ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common"
import { BaseExceptionFilter } from "@nestjs/core"
import { MyLoggerService } from "./my-logger/my-logger.service"
import { PrismaClientValidationError } from "generated/prisma/runtime/library"

type MyResponse = {
    statusCode: number;
    timestamp: string,
    path: string,
    response: string | object
}


@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionFilter.name)

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myResponse: MyResponse = {
            statusCode: 200,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: ""
        }

        if (exception instanceof HttpException) {
            myResponse.statusCode = exception.getStatus();
            myResponse.response = exception.getResponse()
        }
        else if (exception instanceof PrismaClientValidationError) {
            myResponse.statusCode = 422;
            myResponse.response = exception.message.replaceAll(/\n/g, '')
        } else {
            myResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            myResponse.response = 'Internal Server Error'
        }

        // response
        //     .status(myResponse.statusCode)
        //     .json(myResponse)

        // this.logger.error(myResponse.response, AllExceptionFilter.name)

        // super.catch(exception, host)

    }
}