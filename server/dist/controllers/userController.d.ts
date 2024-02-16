declare class UserController {
    registration(req: any, res: any): Promise<void>;
    login(req: any, res: any): Promise<void>;
    checkAuth(req: any, res: any, next: any): Promise<void>;
}
declare const _default: UserController;
export default _default;
