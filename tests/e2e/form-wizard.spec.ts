import { test, expect } from "@playwright/test"

test.describe("Form Wizard Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/create")
    await page.goto("/create/form")
  })

  test("should complete full form wizard flow", async ({ page }) => {
    await expect(page.getByText("Personal Info")).toBeVisible()

    await page.getByPlaceholder(/full name/i).fill("John Doe")
    await page.getByPlaceholder(/tagline/i).fill("Software Developer")
    await page.getByPlaceholder(/bio/i).fill("Passionate about building great software")

    await page.getByRole("button", { name: /next/i }).click()

    await expect(page.getByText("Contact Details")).toBeVisible()

    await page.getByPlaceholder(/email/i).fill("john@example.com")

    await page.getByRole("button", { name: /next/i }).click()

    await expect(page.getByText("Social Links")).toBeVisible()

    await page.getByRole("button", { name: /next/i }).click()

    await expect(page.getByText("Professional Info")).toBeVisible()

    const skillInput = page.getByPlaceholder(/add a skill/i)
    if (await skillInput.isVisible()) {
      await skillInput.fill("JavaScript")
      await skillInput.press("Enter")
    }

    await page.getByRole("button", { name: /next/i }).click()

    await expect(page.getByText(/design/i)).toBeVisible()

    await page.getByRole("button", { name: /generate website/i }).click()

    await expect(page).toHaveURL(/\/create\/generate/)
  })

    await page.getByRole("button", { name: /next/i }).click()

    await expect(page.locator("text=/required/i").first()).toBeVisible()
  })

  test("should allow navigation between completed steps", async ({ page }) => {
    await page.getByPlaceholder(/full name/i).fill("John Doe")
    await page.getByPlaceholder(/tagline/i).fill("Developer")
    await page.getByPlaceholder(/bio/i).fill("Bio text")

    await page.getByRole("button", { name: /next/i }).click()

    await expect(page.getByText("Contact Details")).toBeVisible()

    const step1Button = page.locator('button:has-text("1")')
    await step1Button.click()

    await expect(page.getByText("Personal Info")).toBeVisible()
  })

  test("should validate email format", async ({ page }) => {
    await page.getByPlaceholder(/full name/i).fill("John Doe")
    await page.getByPlaceholder(/tagline/i).fill("Developer")
    await page.getByPlaceholder(/bio/i).fill("Bio text")

    await page.getByRole("button", { name: /next/i }).click()

    await page.getByPlaceholder(/email/i).fill("invalid-email")

    await page.getByRole("button", { name: /next/i }).click()

    await expect(page.locator("text=/invalid email/i")).toBeVisible()
  })

  test("should display progress indicator", async ({ page }) => {
    await expect(page.getByText(/Step 1 of 5/i)).toBeVisible()

    const progressBar = page.locator('[role="progressbar"]')
    await expect(progressBar).toBeVisible()
  })

  test("should disable Previous button on first step", async ({ page }) => {
    const prevButton = page.getByRole("button", { name: /previous/i })
    await expect(prevButton).toBeDisabled()
  })
})
