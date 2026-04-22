import { Button } from './design-system'
import './App.css'

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function Section({ title, children }) {
  return (
    <section className="ds-section">
      <h2 className="ds-section-title">{title}</h2>
      <div className="ds-row">{children}</div>
    </section>
  )
}

export default function App() {
  return (
    <div className="ds-page">
      <header className="ds-header">
        <h1 className="ds-title">Thunder DS</h1>
        <p className="ds-subtitle">SuperApp Design System</p>
      </header>

      <main className="ds-main">

        <Section title="Intent — Filled">
          <Button intent="neutral" variant="filled">Neutral</Button>
          <Button intent="brand" variant="filled">Brand</Button>
          <Button intent="destructive" variant="filled">Destructive</Button>
        </Section>

        <Section title="Intent — Muted">
          <Button intent="neutral" variant="muted">Neutral</Button>
          <Button intent="brand" variant="muted">Brand</Button>
          <Button intent="destructive" variant="muted">Destructive</Button>
        </Section>

        <Section title="Intent — Ghost">
          <Button intent="neutral" variant="ghost">Neutral</Button>
          <Button intent="brand" variant="ghost">Brand</Button>
          <Button intent="destructive" variant="ghost">Destructive</Button>
        </Section>

        <Section title="Sizes">
          <Button size="xs">X Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
        </Section>

        <Section title="With Icons">
          <Button leadingIcon={<PlusIcon />}>Add Item</Button>
          <Button intent="brand" trailingIcon={<ChevronIcon />}>Options</Button>
          <Button intent="neutral" variant="muted" leadingIcon={<PlusIcon />} trailingIcon={<ChevronIcon />}>Both</Button>
        </Section>

        <Section title="States">
          <Button isLoading>Loading</Button>
          <Button intent="brand" isLoading>Saving</Button>
          <Button isDisabled>Disabled</Button>
          <Button intent="destructive" isDisabled>Disabled</Button>
        </Section>

      </main>
    </div>
  )
}
