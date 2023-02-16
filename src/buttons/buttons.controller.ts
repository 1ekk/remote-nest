import { Controller, Get, Param } from '@nestjs/common';
import { ButtonsService } from './buttons.service';


@Controller()
export class ButtonsController {
    constructor(private readonly buttonService: ButtonsService) {}
    @Get('/device/:dev_id/button/:btn_id')
    getProxyRequest(
        @Param('dev_id') device_token: string,
        @Param('btn_id') btn: string
    ) {
        return this.buttonService.getProxyRequest(device_token, btn);
    }
}
