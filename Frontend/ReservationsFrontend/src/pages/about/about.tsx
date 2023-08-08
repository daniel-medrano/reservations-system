import { Button } from "@/components/ui/button"
import { Icons } from "@/assets/icons"


export function About (){
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    return 
    <>
    <h1> About </h1>

    <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    
    </>
    
}