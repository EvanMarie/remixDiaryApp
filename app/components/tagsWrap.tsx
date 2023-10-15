import { radius } from "~/styles/customTheme";
import TagBadge from "./tagBadge";
import { Wrap } from "@chakra-ui/react";

type TagsWrapProps = {
  tags: string[];
};

export default function TagsWrap({ tags }: TagsWrapProps) {
  return (
    <Wrap justify="start" w="100%">
      {tags.map((tag) => (
        <TagBadge key={tag} fontSize="sm" lineHeight="1.4rem" rounded={radius}>
          {tag}
        </TagBadge>
      ))}
    </Wrap>
  );
}
