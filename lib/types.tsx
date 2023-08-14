export interface IPicture {
    id: string,
    name: string,
    src: string
}

export interface IStatePictures {
    pictures: Array<IPicture>,
    arePicturesLoading: boolean
}