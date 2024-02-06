import IQrsOnlineUser from '@myTypes/queryParams/IQrsOnlineUser';

class ChatService {
  public onlineUsers = new Map<number, string>();

  public findBy(where: IQrsOnlineUser): string | undefined {
    if (!where.id) return undefined;

    if (where.id) return this.onlineUsers.get(where.id);

    return undefined;
  }

  public getKeyBy(where: IQrsOnlineUser): number | undefined {
    if (!where.value) return undefined;

    const key = [...this.onlineUsers.entries()].find(
      ({ 1: value }) => value === where.value
    );

    if (!key) return undefined;
    return key[0];
  }

  public deleteById(id: number): void {
    this.onlineUsers.delete(id);
  }

  public setOnlineUsers(id: number, value: string): void {
    this.onlineUsers.set(id, value);
  }
}

export default new ChatService();
