import React, {FC, forwardRef} from "react";
import css from "./FeaturesAccordion.module.scss";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import KeyValueList from "./KeyValueList";
import List from "./List";

interface Props {
  product: ProductExtraDataResponse;
}

const FeaturesAccordion: FC<Props> = (props) => {
  const {
    material,
    season,
    rating_reviews,
    rating_value,
    features,
    description,
  } = props.product;

  return (
    <>
      <Accordion.Root
        className={css["accordion-root"]}
        type="multiple"
        defaultValue={["item-1"]}
      >
        <Accordion.Item className={css["accordion-item"]} value="item-1">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>{description}</AccordionContent>
        </Accordion.Item>
        <Accordion.Item className={css["accordion-item"]} value="item-2">
          <AccordionTrigger>Material</AccordionTrigger>
          <AccordionContent>
            <KeyValueList
              keyValueArray={[
                {key: "Upper material", value: material},
                {key: "Lining", value: material},
                {key: "Insole", value: material},
                {key: "Sole", value: material},
                {key: "Padding type", value: material},
              ]}
            />
          </AccordionContent>
        </Accordion.Item>
        <Accordion.Item className={css["accordion-item"]} value="item-3">
          <AccordionTrigger>Season</AccordionTrigger>
          <AccordionContent>
            <KeyValueList
              keyValueArray={[{key: "Best suitable for", value: season}]}
            />
          </AccordionContent>
        </Accordion.Item>
        <Accordion.Item className={css["accordion-item"]} value="item-4">
          <AccordionTrigger>Reviews</AccordionTrigger>
          <AccordionContent>
            <KeyValueList
              keyValueArray={[
                {key: "Average rating", value: rating_value},
                {key: "Number of reviews", value: rating_reviews.toString()},
              ]}
            />
          </AccordionContent>
        </Accordion.Item>
        <Accordion.Item className={css["accordion-item"]} value="item-5">
          <AccordionTrigger>Features</AccordionTrigger>
          <AccordionContent>
            <List listArray={features} />
          </AccordionContent>
        </Accordion.Item>
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
    <Accordion.Header className={css["accordion-header"]}>
      <Accordion.Trigger
        className={classNames(css["accordion-trigger"], className)}
        {...props}
        ref={ref}
      >
        {children}
        <ChevronDownIcon className={css["accordion-chevron"]} aria-hidden />
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
      className={classNames(css["accordion-content"], className)}
      {...props}
      ref={ref}
    >
      <div className={css["accordion-content-text"]}>{children}</div>
    </Accordion.Content>
  )
);

export default FeaturesAccordion;
