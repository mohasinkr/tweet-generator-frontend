import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckIcon, ChevronDownIcon } from "lucide-react"


const Select = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    onValueChange?: (value: string) => void
    defaultValue?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    disabled?: boolean
  }
>(({ className, children, value, onValueChange, defaultValue, open, onOpenChange, disabled, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(open || false)
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || "")
  
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])
  
  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])
  
  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }
  
  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
    handleOpenChange(false)
  }
  
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      {...props}
    >
      <SelectTrigger
        onClick={() => !disabled && handleOpenChange(!isOpen)}
        className={cn(disabled && "opacity-50 cursor-not-allowed")}
        disabled={disabled}
      >
        {React.Children.toArray(children).find(
          (child) => 
            React.isValidElement<SelectItemProps>(child) && 
            child.type === SelectItem && 
            child.props.value === selectedValue
        ) || (
          <SelectPlaceholder>Select an option</SelectPlaceholder>
        )}
        <SelectIcon />
      </SelectTrigger>
      {isOpen && !disabled && (
        <SelectContent>
          {React.Children.map(children, (child) => {
            if (React.isValidElement<SelectItemProps>(child) && child.type === SelectItem) {
              return React.cloneElement(child, {
                selected: child.props.value === selectedValue,
                onSelect: () => handleValueChange(child.props.value),
              })
            }
            return child
          })}
        </SelectContent>
      )}
    </div>
  )
})
Select.displayName = "Select"

const SelectTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { disabled?: boolean }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute z-50 min-w-[8rem] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
      className
    )}
    style={{ top: "calc(100% + 0.5rem)" }}
    {...props}
  >
    <div className="w-full p-1">{children}</div>
  </div>
))
SelectContent.displayName = "SelectContent"

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  selected?: boolean
  onSelect?: () => void
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, selected, onSelect, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={onSelect}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        {selected && <CheckIcon className="h-4 w-4" />}
      </span>
      <span className="truncate">{children}</span>
    </div>
  )
)
SelectItem.displayName = "SelectItem"

const SelectPlaceholder = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-muted-foreground", className)}
    {...props}
  >
    {children}
  </span>
))
SelectPlaceholder.displayName = "SelectPlaceholder"

const SelectIcon = () => (
  <ChevronDownIcon className="h-4 w-4 opacity-50" />
)

export { Select, SelectTrigger, SelectContent, SelectItem, SelectPlaceholder }
