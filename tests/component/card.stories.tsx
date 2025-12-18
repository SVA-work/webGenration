import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "./card"
import { Button } from "./button"
import { Settings } from "lucide-react"

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content area with some example text to demonstrate the layout.</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Setup</CardTitle>
        <CardDescription>Deploy your new project in one-click</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Configure your project settings before deployment.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Your account settings and preferences.</p>
      </CardContent>
    </Card>
  ),
}

export const FeatureCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="pt-6">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
        <p className="text-muted-foreground">
          Generate your complete website in under 5 minutes. Simple form, instant results.
        </p>
      </CardContent>
    </Card>
  ),
}

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[700px]">
      <Card>
        <CardHeader>
          <CardTitle>Basic Plan</CardTitle>
          <CardDescription>Perfect for getting started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">$9</div>
          <p className="text-sm text-muted-foreground">per month</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Choose Plan</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pro Plan</CardTitle>
          <CardDescription>For professional users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">$29</div>
          <p className="text-sm text-muted-foreground">per month</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Choose Plan</Button>
        </CardFooter>
      </Card>
    </div>
  ),
}
