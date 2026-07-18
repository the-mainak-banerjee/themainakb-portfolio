import { Typography } from "@/components/ui/typography";
import { USER } from "../../data/user";
import FlipSentences from "./flip-sentences";
import Greetings from "./greetings";
import ProfileImage from "./profile-image";
import Actions from "./actions";
import ContactInfo from "./contact-info";
import { Reveal } from "@/components/global/reveal";
import Prose from "@/components/ui/prose";
import { ReactMarkDown } from "@/components/global/react-markdown";

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
            <Prose className="prose-p:mt-4 prose-p:mb-4 prose-p:first:mt-0 prose-p:last:mb-0 prose-p:text-muted-foreground">
              <ReactMarkDown>{USER.about}</ReactMarkDown>
            </Prose>
          </div>
          <Actions />
        </div>
      </div>
    </Reveal>
  );
}

export default HeroSection;
