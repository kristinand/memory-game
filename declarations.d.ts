declare module '*.svg';
declare module '*.css' {
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
