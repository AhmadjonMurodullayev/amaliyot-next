"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginData, registerData } from "@/service/auth-mutations";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

function Register() {
  const [isPending, startTransition] = React.useTransition();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const {
    handleSubmit: saveDataSubmit,
    register: register2,
    reset: reset2,
  } = useForm();
  const [activeTab, setActiveTab] = useState("account");
  const router = useRouter();

  React.useEffect(() => {
    console.log(errors);
  }, [errors]);

  const submit = async (data: FieldValues) => {
    startTransition(async () => {
      try {
        const { phone_number, password } = data;
        const res = await registerData({ phone_number, password });
        if (res) {
          setActiveTab("password");
        }
      } catch (error) {
        console.error("Registration error:", error);
      } finally {
        reset();
      }
    });
  };

  const saveData = (data: FieldValues) => {
    console.log(data);

    startTransition(async () => {
      try {
        const { phone_number } = data;
        const res = await loginData({ phone_number });

        if (res) {
          // router.push("/");
        }
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        reset2();
      }
    });
  };

  return (
    <div className="container mx-auto max-w-[1200px] flex justify-center items-center h-screen bg-gray-100">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="w-[400px] bg-white shadow-lg rounded-lg p-5"
      >
        <TabsList className="grid w-full grid-cols-2 rounded-t-lg overflow-hidden items-center">
          <TabsTrigger
            value="account"
            className="p-2 text-center font-medium hover:bg-gray-300 focus:outline-none"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="p-2 text-center font-medium hover:bg-gray-300 focus:outline-none"
          >
            Register
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card className="p-4 rounded-b-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold">Login</CardTitle>
              <CardDescription className="text-gray-500">
                Access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit(submit)}>
                <div className="space-y-2">
                  <Label htmlFor="phone_number" className="text-gray-600">
                    Phone Number
                  </Label>
                  <Input
                    id="phone_number"
                    placeholder="Enter your phone number"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register("phone_number", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-600">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register("password", { required: true })}
                  />
                </div>
                <CardFooter className="flex justify-end mt-4">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Login
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card className="p-4 rounded-b-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold">Register</CardTitle>
              <CardDescription className="text-gray-500">
                Create a new account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={saveDataSubmit(saveData)}>
                <div className="space-y-2">
                  <Label htmlFor="phone_number" className="text-gray-600">
                    Phone Number
                  </Label>
                  <Input
                    id="phone_number"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register2("phone_number", { required: true })}
                  />
                </div>

                <CardFooter className="flex justify-end mt-4">
                  <Button
                    type="submit"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Register
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Register;
