import { Button, ButtonProps } from '@/components/ui/button'

export function ConfirmButton(button: ButtonProps) {
    return <Button {...button} />
}

export function CancelButton(button: ButtonProps) {
    return <Button variant="outline" {...button} />
}

interface ToggleStatusProps<T> {
    item: T
    status: 'selected' | 'init'
}

export const getToggleStatus = <T,>(
    itemArr: T[],
    selected: T | undefined,
): ToggleStatusProps<T>[] => {
    const getStatus = (item: T, selectedItem: T | undefined) =>
        item === selectedItem ? 'selected' : 'init'

    return itemArr.map((i) => ({ item: i, status: getStatus(i, selected) }))
}

export function ButtonBox({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="gap-2 grid grid-flow-dense"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(70px, auto))' }}
        >
            {children}
        </div>
    )
}

export function ToggleButton<T extends React.ReactNode>({
    data,
    status,
    setSelected,
    icon,
}: {
    data: T
    status: 'selected' | 'disabled' | 'init'
    setSelected: (s: T) => void
    icon?: JSX.Element
}) {
    const variants = {
        selected: 'default',
        disabled: 'default',
        init: 'outline',
    }

    return (
        <Button
            size="sm"
            disabled={status === 'disabled'}
            variant={variants[status] as 'default' | 'outline'}
            onClick={() => setSelected(data)}
        >
            <span className="px-3 flex gap-1 items-center">
                {data} {icon}
            </span>
        </Button>
    )
}
