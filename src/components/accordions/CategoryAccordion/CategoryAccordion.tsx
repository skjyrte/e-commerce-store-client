import {FC, forwardRef} from "react";
import css from "./CategoryAccordion.module.scss";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import TextLinkElement from "../../LinkElements/TextLinkElement";

interface Props {
  categoryList: {gender: string; categories: string[]}[];
  onCloseModal: () => void;
}

const CategoryAccordion: FC<Props> = (props) => {
  const {categoryList, onCloseModal} = props;

  const accordionContents = () => {
    return categoryList.map((categoryObject, index) => {
      const {gender, categories} = categoryObject;
      return (
        <Accordion.Item
          className={css.AccordionItem}
          value={`item-${index.toString()}`}
        >
          <AccordionTrigger>{gender}</AccordionTrigger>
          <AccordionContent>
            {categories.map((categoryString) => {
              return (
                <TextLinkElement
                  displayedText={categoryString}
                  path={`${gender}${categoryString === "all" ? "" : `/${categoryString}`}`}
                  onClick={onCloseModal}
                />
              );
            })}
          </AccordionContent>
        </Accordion.Item>
      );
    });
  };

  return (
    <>
      <Accordion.Root
        className={css.AccordionRoot}
        type="multiple"
        defaultValue={["item-0", "item-1"]}
      >
        {accordionContents()}
      </Accordion.Root>
    </>
  );
};

type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof Accordion.Trigger
> & {
  className?: string;
};

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({children, className, ...props}, ref) => (
    <Accordion.Header className={css.AccordionHeader}>
      <Accordion.Trigger
        className={classNames(css.AccordionTrigger, className)}
        {...props}
        ref={ref}
      >
        {children}
        <ChevronDownIcon className={css.AccordionChevron} aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof Accordion.Content
> & {
  className?: string;
};

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({children, className, ...props}, ref) => (
    <Accordion.Content
      className={classNames(css.AccordionContent, className)}
      {...props}
      ref={ref}
    >
      <div className={css.AccordionContentText}>{children}</div>
    </Accordion.Content>
  )
);

export default CategoryAccordion;
