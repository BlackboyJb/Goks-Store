import { cn } from "@/lib/utils";

const ProductPrice = ({ value, className }: { value: number; className?: string }) => {
    //Ensure to two decimal Place
    const stringValue = value.toFixed(2)
    // get the int/float
    const [intValue, floatValue] = stringValue.split('.')
    const formattedIntValue = new Intl.NumberFormat("en-US").format(parseInt(intValue));
    return (<p className={cn('text-2xl', className)}>
        <span className="text-xs align-super">₦</span>
        {formattedIntValue}
        <span className="text-xs align-super">.{floatValue}</span>
    </p>);
}

export default ProductPrice;