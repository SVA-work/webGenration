import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
  test("should load homepage successfully", async ({ page }) => {
    await page.goto("/")

    await expect(page).toHaveTitle(/Website Generator/i)

    const heading = page.getByRole("heading", {
      name: /Create Your Professional Business Card Website in Minutes/i,
    })
    await expect(heading).toBeVisible()
  })

  test("should navigate to create page", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("link", { name: /start building/i }).click()

    await expect(page).toHaveURL("/create")
  })

  test("should navigate to templates page", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("link", { name: /browse templates/i }).click()

    await expect(page).toHaveURL("/templates")
  })

  test("should display feature cards", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByText("Lightning Fast")).toBeVisible()
    await expect(page.getByText("Beautiful Templates")).toBeVisible()
    await expect(page.getByText("AI-Powered")).toBeVisible()
    await expect(page.getByText("Export Ready")).toBeVisible()
  })

  test("should display how it works section", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByText("How It Works")).toBeVisible()
    await expect(page.getByText("Choose Your Template")).toBeVisible()
    await expect(page.getByText("Fill In Your Details")).toBeVisible()
    await expect(page.getByText("Download & Deploy")).toBeVisible()
  })

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/")

    const templatesLink = page.getByRole("link", { name: /^templates$/i }).first()
    await expect(templatesLink).toBeVisible()
    await expect(templatesLink).toHaveAttribute("href", "/templates")

    const howItWorksLink = page.getByRole("link", { name: /how it works/i }).first()
    await expect(howItWorksLink).toBeVisible()
    await expect(howItWorksLink).toHaveAttribute("href", "/how-it-works")
  })
})
