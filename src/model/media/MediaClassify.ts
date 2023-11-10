interface MediaClassify {
  id: number,
  name: string,
  src: string,
  status: number,
  creator: {
    id: number,
    username: string
  }
}
