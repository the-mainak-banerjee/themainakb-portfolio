import { Typography } from "@/components/ui/typography";
import { USER } from "../../data/user";
import FlipSentences from "./flip-sentences";
import Greetings from "./greetings";
import ProfileImage from "./profile-image";
import Actions from "./actions";

function HeroSection() {
  return (
    <div className="space-y-8">
      <div className="flex items-end gap-4 md:items-center md:gap-6">
        <ProfileImage />
        <div className="mb-2 md:mb-0">
          <Typography variant="h4" className="font-bold" as="h1">
            {USER.displayName}
          </Typography>
          <FlipSentences sentences={USER.animatedSentences} />
        </div>
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
  );
}

export default HeroSection;
