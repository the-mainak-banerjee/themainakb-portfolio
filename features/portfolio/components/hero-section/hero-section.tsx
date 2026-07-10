import { Typography } from "@/components/ui/typography";
import { USER } from "../../data/user";
import FlipSentences from "./flip-sentences";
import Greetings from "./greetings";
import ProfileImage from "./profile-image";
import Actions from "./actions";
import ContactInfo from "./contact-info";
import { Reveal } from "@/components/global/reveal";

function HeroSection() {
  return (
    <Reveal>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4 md:gap-6">
            <ProfileImage />
            <div className="mb-2">
              <Typography variant="h1" className="font-bold">
                {USER.displayName}
              </Typography>
              <FlipSentences sentences={USER.animatedSentences} />
            </div>
          </div>
          <ContactInfo />
        </div>

        <div className="space-y-4">
          <div>
            <Greetings className="mb-2" />
            <Typography className="whitespace-pre-line" variant="body-sm">
              {USER.about}
            </Typography>
          </div>
          <Actions />
        </div>
      </div>
    </Reveal>
  );
}

export default HeroSection;
