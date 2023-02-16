import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Device } from './devices.model';
import { CreateDeviceDto } from './dto/create-device.dto';
import { readFile, writeFile } from 'fs/promises';
// import * as path from 'path'

@Injectable()
export class DeviceService {

    constructor(@InjectModel(Device) private deviceRepository: typeof Device) {}

    async createDevice(dto: CreateDeviceDto) {
        const device = await this.deviceRepository.create(dto);
        return device;
    }

    async getAllDevices() {
        const devices = await this.deviceRepository.findAll({order: [['id', 'ASC']], raw: true});
        readFile('/home/tg_1ek/Projects/DIP/config/token_file.cfg', 'utf-8').then(data => console.log(data))
        return devices;
    }

    async getDeviceById(id: string) {
        const device = await this.deviceRepository.findOne({where: {id: id}});
        return device;
    }

    async getDeviceByToken(token: string) {
        const device = await this.deviceRepository.findOne({where: {token: token}});
        return device;
    }

    async updateDeviceById(id:string, dto: CreateDeviceDto) {
        const device = await this.deviceRepository.update({...dto},{where: {id: id}, returning: true});
        return device;
    }

    async deleteDeviceById(id: string) {
        const device = await this.deviceRepository.destroy({where: {id: id}});
        return device;
    }
}
