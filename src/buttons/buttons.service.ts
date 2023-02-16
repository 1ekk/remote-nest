import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError } from 'rxjs';
import { DeviceService } from 'src/devices/devices.service';

@Injectable()
export class ButtonsService {
    constructor(private readonly httpService: HttpService,
                private deviceService: DeviceService) {}

     #getURL(devices_list, req_token, req_btn) {
        const device_ip = devices_list.find(device => device.token === req_token).host
        return `http://${device_ip}/instrumentctrl/vnc/php/sethardkeyaction.php?ID=${req_btn}`
    }

    async getProxyRequest(device_token: string, btn: string) {
        const url = await this.deviceService.getAllDevices().then(devices => this.#getURL(devices, device_token, btn))
        console.log(url)
        return this.httpService.get(url, { timeout: 3000 ,timeoutErrorMessage: 'NOT AN ERROR'}).pipe(catchError(err => {throw err.message}))
    }
}
