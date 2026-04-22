import { useState } from 'react'
import {
  Button, IconButton, Tag, Avatar, AvatarGroup,
  Radio, RadioGroup, Spinner, List, ListItem,
  AppBar, BottomSheet
} from './design-system'
import './App.css'

const PlusIcon    = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
const ChevronIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
const SettingsIcon= () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
const SearchIcon  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
const BackIcon    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
const ChevronRightIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>

function Section({ title, children }) {
  return (
    <section className="ds-section">
      <h2 className="ds-section-title">{title}</h2>
      <div className="ds-row">{children}</div>
    </section>
  )
}

function ColumnSection({ title, children }) {
  return (
    <section className="ds-section">
      <h2 className="ds-section-title">{title}</h2>
      <div className="ds-col">{children}</div>
    </section>
  )
}

export default function App() {
  const [radio, setRadio] = useState('monthly')
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="ds-page">
      <AppBar
        title="Thunder DS"
        subtitle="SuperApp Design System"
        isSticky
        leading={<Avatar initials="TD" size="sm" />}
        trailing={
          <>
            <IconButton icon={<SearchIcon />} label="Search" />
            <IconButton icon={<SettingsIcon />} label="Settings" />
          </>
        }
      />

      <main className="ds-main">

        {/* BUTTON */}
        <Section title="Button — Filled">
          <Button intent="neutral" variant="filled">Neutral</Button>
          <Button intent="brand" variant="filled">Brand</Button>
          <Button intent="destructive" variant="filled">Destructive</Button>
        </Section>
        <Section title="Button — Muted">
          <Button intent="neutral" variant="muted">Neutral</Button>
          <Button intent="brand" variant="muted">Brand</Button>
          <Button intent="destructive" variant="muted">Destructive</Button>
        </Section>
        <Section title="Button — Ghost">
          <Button intent="neutral" variant="ghost">Neutral</Button>
          <Button intent="brand" variant="ghost">Brand</Button>
          <Button intent="destructive" variant="ghost">Destructive</Button>
        </Section>
        <Section title="Button — Sizes">
          <Button size="xs">X Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
        </Section>
        <Section title="Button — Icons &amp; States">
          <Button leadingIcon={<PlusIcon />}>Add Item</Button>
          <Button intent="brand" trailingIcon={<ChevronIcon />}>Options</Button>
          <Button isLoading>Loading</Button>
          <Button isDisabled>Disabled</Button>
        </Section>

        {/* ICON BUTTON */}
        <Section title="IconButton">
          <IconButton icon={<PlusIcon />} label="Add" variant="filled" />
          <IconButton icon={<SettingsIcon />} label="Settings" variant="muted" />
          <IconButton icon={<SearchIcon />} label="Search" variant="ghost" />
          <IconButton icon={<PlusIcon />} label="Add" intent="brand" variant="filled" />
          <IconButton icon={<PlusIcon />} label="Delete" intent="destructive" variant="muted" />
          <IconButton icon={<PlusIcon />} label="Loading" isLoading />
          <IconButton icon={<PlusIcon />} label="Disabled" isDisabled />
        </Section>

        {/* TAG */}
        <Section title="Tag — Intents">
          <Tag intent="neutral">Neutral</Tag>
          <Tag intent="brand">Brand</Tag>
          <Tag intent="success" hasDot>Success</Tag>
          <Tag intent="warning" hasDot>Warning</Tag>
          <Tag intent="destructive" hasDot>Error</Tag>
          <Tag intent="info">Info</Tag>
        </Section>
        <Section title="Tag — Sizes">
          <Tag size="sm">Small</Tag>
          <Tag size="md">Medium</Tag>
          <Tag size="lg">Large</Tag>
        </Section>

        {/* AVATAR */}
        <Section title="Avatar — Variants">
          <Avatar src="https://i.pravatar.cc/64?img=1" alt="Alice" size="md" />
          <Avatar initials="ET" size="md" />
          <Avatar size="md" />
        </Section>
        <Section title="Avatar — Sizes">
          <Avatar initials="XS" size="xs" />
          <Avatar initials="SM" size="sm" />
          <Avatar initials="MD" size="md" />
          <Avatar initials="LG" size="lg" />
          <Avatar initials="XL" size="xl" />
        </Section>
        <Section title="Avatar — Group">
          <AvatarGroup
            avatars={[
              { src: 'https://i.pravatar.cc/64?img=1', alt: 'Alice' },
              { initials: 'ET' },
              { src: 'https://i.pravatar.cc/64?img=3', alt: 'Carol' },
              { initials: 'DK' },
              { initials: 'MJ' },
            ]}
            max={3}
            size="md"
          />
        </Section>

        {/* SPINNER */}
        <Section title="Spinner — Sizes">
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </Section>
        <Section title="Spinner — Colors">
          <Spinner color="brand" size="md" />
          <Spinner color="neutral" size="md" />
          <Spinner color="white" size="md" />
        </Section>

        {/* RADIO */}
        <ColumnSection title="Radio">
          <RadioGroup
            name="plan"
            value={radio}
            onChange={setRadio}
            options={[
              { value: 'monthly', label: 'Monthly billing' },
              { value: 'annual', label: 'Annual billing (save 20%)' },
              { value: 'enterprise', label: 'Enterprise', disabled: true },
            ]}
          />
        </ColumnSection>

        {/* LIST ITEM */}
        <ColumnSection title="List">
          <div style={{ background: 'var(--tnd-color-bg-surface)', borderRadius: 'var(--tnd-radius-lg)', overflow: 'hidden' }}>
            <List>
              <ListItem
                title="Alice Johnson"
                subtitle="alice@example.com"
                leading={<Avatar src="https://i.pravatar.cc/64?img=1" alt="Alice" size="sm" />}
                value="$1,200"
                trailing={<ChevronRightIcon />}
                onClick={() => {}}
                hasDivider
              />
              <ListItem
                title="Bob Smith"
                subtitle="bob@example.com"
                leading={<Avatar initials="BS" size="sm" />}
                value="$840"
                trailing={<ChevronRightIcon />}
                onClick={() => {}}
                hasDivider
              />
              <ListItem
                title="Settings"
                leading={<IconButton icon={<SettingsIcon />} label="" variant="muted" size="sm" />}
                trailing={<ChevronRightIcon />}
                onClick={() => {}}
              />
            </List>
          </div>
        </ColumnSection>

        {/* BOTTOM SHEET */}
        <Section title="Bottom Sheet">
          <Button intent="brand" variant="filled" onClick={() => setSheetOpen(true)}>
            Open Bottom Sheet
          </Button>
        </Section>

        <BottomSheet
          isOpen={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="Payment Method"
          detent="md"
          footer={
            <>
              <Button intent="brand" variant="filled">Confirm</Button>
              <Button variant="ghost" onClick={() => setSheetOpen(false)}>Cancel</Button>
            </>
          }
        >
          <List>
            <ListItem
              title="Visa ending in 4242"
              subtitle="Expires 12/27"
              leading={<Tag intent="brand">Default</Tag>}
              trailing={<ChevronRightIcon />}
              onClick={() => {}}
              hasDivider
            />
            <ListItem
              title="Mastercard ending in 8888"
              subtitle="Expires 09/26"
              trailing={<ChevronRightIcon />}
              onClick={() => {}}
            />
          </List>
        </BottomSheet>

      </main>
    </div>
  )
}
