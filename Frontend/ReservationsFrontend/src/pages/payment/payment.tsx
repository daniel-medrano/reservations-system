import { DemoPaymentMethod } from "@/components/payment-method"

export function Payment (){
    return (
   <>
    <h1 className="pt-10 pb-2 text-2xl font-semibold mb-4 flex justify-center"> Order </h1>
    <div className="px-32">
        <DemoPaymentMethod />
    </div>
   </>
    )
}