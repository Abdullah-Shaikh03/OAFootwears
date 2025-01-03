
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchApi } from "@/utils/api"
const {useForm} = require("react-hook-form")
const {zodResolver} = require("@hookform/resolvers/zod")
const {useToast} = require("@/hooks/use-toast")


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const formData = useForm({
    resolver: zodResolver(),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const {toast} = useToast()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try{
      const response = await fetchApi("/login", {
        method: "POST",
        body: JSON.stringify(formData.getValues())
      })
      toast({
        title: "Success",
        description: "You have successfully logged in",
        status: "success"
      })
    }catch(error: any){
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        varient: "danger"
      })
    }
    console.log("submit")
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="sign-up" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
