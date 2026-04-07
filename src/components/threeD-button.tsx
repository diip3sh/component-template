"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, type LucideIcon } from "lucide-react";
import { motion, type MotionProps } from "motion/react";

import { cn } from "../libs/utils";

const ICON_STYLE = { size: 14 };
const buttonSizeClasses = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-lg px-3",
  lg: "h-11 rounded-xl px-8",
  xs: "h-8 rounded-md px-4 text-sm",
  icon: "h-10 w-10 border-b border-transparent",
} as const;

const buttonSizeVariants = cva("", {
  variants: {
    size: buttonSizeClasses,
  },
  defaultVariants: {
    size: "default",
  },
});

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2 border",
  {
    variants: {
      variant: {
        ai: "bg-indigo-500 text-white hover:bg-indigo-600 border-indigo-700 border-b-4 border-b-indigo-600 shadow-md",
        default:
          "bg-blue-500 text-primary-foreground hover:bg-blue-600 border-blue-700 border-b-4 border-r-2 border-r-blue-600 border-b-blue-600 shadow-md",
        destructive:
          "bg-red-500 text-destructive-foreground hover:bg-red-600 border-red-700 border-b-4 border-b-red-600 shadow-md",
        outline:
          "border bg-white hover:bg-neutral-100 border-neutral-300 border-b-4 border-b-neutral-200",
        outline_destructive:
          "border text-red-500 bg-white hover:bg-red-50 border-red-600 border-b-4 border-b-red-500",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        ghost_destructive: "bg-transparent text-red-500 hover:bg-red-100",
        link: "text-primary underline-offset-4 hover:underline",
        solid: "bg-zinc-800 text-white hover:bg-zinc-700",
      },
      size: buttonSizeClasses,
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type MotionButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> &
  MotionProps;

type CustomButtonStyle = React.CSSProperties & {
  "--button-surface"?: string;
  "--button-surface-hover"?: string;
  "--button-edge"?: string;
  "--button-border"?: string;
  "--button-text"?: string;
};

export interface ButtonProps extends MotionButtonPropsType {
  asChild?: boolean;
  supportIcon?: LucideIcon;
  leadingIcon?: LucideIcon;
  isLoading?: boolean;
  stretch?: boolean;
}

export interface Custom3DButtonProps extends Omit<
  MotionButtonPropsType,
  "variant"
> {
  supportIcon?: LucideIcon;
  leadingIcon?: LucideIcon;
  isLoading?: boolean;
  stretch?: boolean;
  size?: keyof typeof buttonSizeClasses;
  surfaceColor: string;
  surfaceHoverColor?: string;
  edgeColor: string;
  borderColor?: string;
  textColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      stretch = false,
      supportIcon = undefined,
      leadingIcon = undefined,
      isLoading = false,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const SupportIconRender = supportIcon ?? React.Fragment;
    const LeadingIconRender = leadingIcon ?? React.Fragment;
    return (
      <motion.button
        className={cn(
          buttonVariants({ variant, size, className }),
          stretch && "w-full",
        )}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <Loader2 {...ICON_STYLE} className="animate-spin" />
        ) : null}
        {!isLoading && supportIcon && <SupportIconRender {...ICON_STYLE} />}
        {children}
        {leadingIcon && <LeadingIconRender {...ICON_STYLE} />}
      </motion.button>
    );
  },
);
Button.displayName = "Button";

const customButtonBase =
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2 border border-b-4 shadow-md bg-[var(--button-surface)] text-[var(--button-text)] border-[var(--button-border)] border-b-[var(--button-edge)] hover:bg-[var(--button-surface-hover)] cursor-pointer";

export const Custom3DButton = React.forwardRef<
  HTMLButtonElement,
  Custom3DButtonProps
>(
  (
    {
      className,
      size,
      children,
      stretch = false,
      supportIcon = undefined,
      leadingIcon = undefined,
      isLoading = false,
      surfaceColor,
      surfaceHoverColor,
      edgeColor,
      borderColor,
      textColor = "white",
      style,
      ...props
    },
    ref,
  ) => {
    const SupportIconRender = supportIcon ?? React.Fragment;
    const LeadingIconRender = leadingIcon ?? React.Fragment;
    const customStyle: CustomButtonStyle = {
      "--button-surface": surfaceColor,
      "--button-surface-hover": surfaceHoverColor ?? surfaceColor,
      "--button-edge": edgeColor,
      "--button-border": borderColor ?? edgeColor,
      "--button-text": textColor,
      ...style,
    };

    return (
      <motion.button
        className={cn(
          customButtonBase,
          buttonSizeVariants({ size }),
          stretch && "w-full",
          className,
        )}
        style={customStyle}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <Loader2 {...ICON_STYLE} className="animate-spin" />
        ) : null}
        {!isLoading && supportIcon && <SupportIconRender {...ICON_STYLE} />}
        {children}
        {leadingIcon && <LeadingIconRender {...ICON_STYLE} />}
      </motion.button>
    );
  },
);

Custom3DButton.displayName = "Custom3DButton";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "button-group flex flex-row overflow-hidden rounded-lg border w-fit divide-x",
          "*:rounded-none *:border-none",
          className,
        )}
        {...props}
      />
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";

export { Button, buttonVariants };
