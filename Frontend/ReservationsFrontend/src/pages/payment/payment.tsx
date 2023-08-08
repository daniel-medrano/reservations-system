import { DemoPaymentMethod } from "@/components/payment-method"

export function Payment (){
    return (
   <>
    <h1 className="flex justify-center"> Order </h1>
    <div className="px-8">
        <DemoPaymentMethod />
    </div>
   </>
    )
}