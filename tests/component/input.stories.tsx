import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"
import { Label } from "./label"
import { Mail, Search, Lock } from "lucide-react"

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-[350px] gap-2">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
}

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
    value: "Cannot edit",
  },
}

export const WithError: Story = {
  render: () => (
    <div className="grid w-[350px] gap-2">
      <Label htmlFor="email-error">Email</Label>
      <Input type="email" id="email-error" placeholder="email@example.com" aria-invalid="true" />
      <p className="text-sm text-destructive">Please enter a valid email address</p>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="grid w-[350px] gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-10" placeholder="Search..." />
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-10" type="email" placeholder="Email" />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-10" type="password" placeholder="Password" />
      </div>
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <form className="grid w-[350px] gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email-form">Email</Label>
        <Input id="email-form" type="email" placeholder="john@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password-form">Password</Label>
        <Input id="password-form" type="password" placeholder="••••••••" />
      </div>
    </form>
  ),
}
