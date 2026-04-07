"use client";
import { motion, MotionConfig } from "motion/react";
import { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

// import {
//   Appointment01Icon,
//   BalloonsIcon,
//   GoogleMapsIcon,
//   ZoomIcon,
//   ReminderIcon,
//   TaskDaily01Icon,
//   Tick02Icon,
//   FilterHorizontalIcon,
// } from "@hugeicons/core-free-icons";
// import { HugeiconsFreeIcons } from "@hugeicons/core-free-icons";
// import { HugeiconsIcon } from "@hugeicons/react";

export type FilterKey = (typeof filterKeys)[number];

// Change Here
export const filterKeys = [
  {
    name: "workspace",
    Icon: "/svgs/workspace.svg",
  },
  {
    name: "events",
    Icon: "/svgs/event.svg",
  },
  {
    name: "calendar",
    Icon: "/svgs/remainder.svg",
  },
  {
    name: "finance",
    Icon: "/svgs/finance.svg",
  },
  {
    name: "task",
    Icon: "/svgs/task.svg",
  },
  {
    name: "location",
    Icon: "/svgs/location.svg",
  },
];

function ListItem(props: {
  index: number;
  filterKey: FilterKey;
  selectedFilterKey: FilterKey;
  setSelectedFilterKey: Dispatch<SetStateAction<FilterKey>>;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    index,
    filterKey,
    selectedFilterKey,
    setSelectedFilterKey,
    setIsOpened,
  } = props;
  const delay = (index + 8) * 0.025;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        bounce: 0.1,
        duration: 0.25,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      onClick={() => {
        setSelectedFilterKey(filterKey);

        setTimeout(() => {
          setIsOpened(false);
        }, 150);
      }}
      className="px-3 py-2 rounded-2xl flex justify-between items-center cursor-default hover:bg-accent  text-foreground"
    >
      <div className="flex items-center gap-x-3">
        <span className="text-muted-foreground">
          {/*<filterKey.Icon size={24} />*/}
          <img src={filterKey.Icon} className="size-6" alt={filterKey.name} />
        </span>
        <span className="capitalize">{filterKey.name}</span>
      </div>
      <div
        className={clsx(
          "relative border-border w-6 h-6 overflow-hidden rounded-full",
          selectedFilterKey.name == filterKey.name
            ? "border-none"
            : "border-[2px]",
        )}
      >
        {selectedFilterKey.name == filterKey.name && (
          <div className="absolute inset-0 bg-primary flex justify-center items-center text-primary-foreground">
            <HugeiconsIcon icon={Tick02Icon} size={16} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

const FilterInteraction = () => {
  const [selectedFilterKey, setSelectedFilterKey] = useState(filterKeys[0]);
  const [isOpened, setIsOpened] = useState(false);

  return (
    <section className="flex justify-center items-center fill-muted-foreground/70">
      <MotionConfig
        transition={{ type: "spring", duration: 0.85, bounce: 0.35 }}
      >
        <div
          onClick={() => setIsOpened(true)}
          className="relative left-2.5 w-20 h-20 flex justify-center items-center cursor-pointer"
        >
          <img
            src={"/svgs/filter.svg"}
            className="text-foreground relative z-10 fill-none size-9"
          />
          <motion.div
            layoutId="wrapper"
            className="absolute inset-0 z-[2] bg-background border-none shadow-sm ring-1 shadow-black/10 ring-black/10 cursor-pointer"
            style={{ borderRadius: 40 }}
          />
        </div>
        <motion.div
          initial={{ x: 0 }}
          animate={{
            x: isOpened ? -20 : 0,
            transition: { delay: isOpened ? 0 : 0.2 },
          }}
          transition={{ type: "spring", bounce: 0.3, duration: 1.5 }}
          className="relative right-2.5 w-20 h-20 shadow-sm ring-1 shadow-black/10 ring-black/10 rounded-full flex justify-center items-center bg-background"
        >
          <span className="text-muted-foreground">
            <img
              src={selectedFilterKey.Icon}
              className="size-9"
              alt={selectedFilterKey.name}
            />
          </span>
        </motion.div>

        {isOpened && (
          <motion.section
            layoutId="wrapper"
            className="absolute z-20 w-72 px-1 py-1 bg-card border border-border text-xl overflow-hidden "
            style={{ borderRadius: 20, borderWidth: 1 }}
          >
            <div className="flex flex-col gap-1">
              {filterKeys.map((item, index) => (
                <ListItem
                  key={item.name}
                  index={index}
                  filterKey={item}
                  selectedFilterKey={selectedFilterKey}
                  setSelectedFilterKey={setSelectedFilterKey}
                  setIsOpened={setIsOpened}
                />
              ))}
            </div>
          </motion.section>
        )}
      </MotionConfig>
    </section>
  );
};

export default FilterInteraction;
