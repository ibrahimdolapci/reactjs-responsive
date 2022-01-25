export type TakeActionModelProps = {
    visible: boolean,
    onCancel: () => void
}

export interface Action {
    id: number
    title: string
    description: string
}
