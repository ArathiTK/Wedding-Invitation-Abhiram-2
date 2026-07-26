import PageWrapper from "./components/PageWrapper";
import GlassPager from "./components/GlassPager";
import SaveTheDateSection from "./components/SaveTheDateSection";
import VideoBgSection from "./components/VideoBgSection";
import InvitationMessage from "./components/InvitationMessage";
import EventsSection from "./components/EventsSection";
import RSVPForm from "./components/RSVPForm";

export default function Page() {
  return (
    <PageWrapper>
      <main>
        <GlassPager
          pages={[
            <SaveTheDateSection key="save-the-date" />,
            <VideoBgSection key="story" />,
            <InvitationMessage key="invitation" />,
            <EventsSection key="events" />,
            <RSVPForm key="rsvp" />,
          ]}
        />
      </main>
    </PageWrapper>
  );
}
