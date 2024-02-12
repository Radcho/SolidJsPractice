import Approver from '../interfaces/approver';
import { getFakeApprovers, wait } from '../utils/mockUtil';
import BaseService from './baseService';

class LeaveService extends BaseService {
    public async getListOfApprovers(): Promise<Array<Approver>> {
        // return await this.get<Array<Approver>>('/approvers');

        await wait(500);
        return getFakeApprovers();
    }
}

const leaveService = new LeaveService();
export default leaveService;
