export default interface IComponentZod {
  name: string;
  type: 'body' | 'path' | 'query';
  properties: any;
}
