declare module '*.svg';
declare module '*.scss' {
  type Binding = { [key: string]: string };
  const content: Binding;
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.gif' {
  const content: string;
  export default content;
}
declare module '*.opus';
