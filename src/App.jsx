import tournament from './data/tournament.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import StatsStrip from './components/StatsStrip.jsx'
import Format from './components/Format.jsx'
import Rules from './components/Rules.jsx'
import TieBreakers from './components/TieBreakers.jsx'
import Pricing from './components/Pricing.jsx'
import FreeAgentSection from './components/FreeAgentSection.jsx'
import CharitySwingOff from './components/CharitySwingOff.jsx'
import RegisterSection from './components/RegisterSection.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Nav tournament={tournament} />
      <Hero tournament={tournament} />
      <StatsStrip tournament={tournament} />
      <main>
        <Format tournament={tournament} />
        <Rules tournament={tournament} />
        <TieBreakers tournament={tournament} />
        <Pricing tournament={tournament} />
        <FreeAgentSection tournament={tournament} />
        <CharitySwingOff tournament={tournament} />
        <RegisterSection tournament={tournament} />
      </main>
      <Footer tournament={tournament} />
    </>
  )
}
