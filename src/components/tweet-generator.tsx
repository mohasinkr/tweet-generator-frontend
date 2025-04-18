import React, { useState, useRef } from "react";
import { Select, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, CopyIcon, CheckIcon } from "lucide-react";

// Tweet categories and their content
const tweetCategories = [
  {
    id: "tech",
    name: "Technology",
    tweets: [
      "Just discovered a new AI tool that's revolutionizing how I code. The future is here! #AI #TechInnovation",
      "Spent the weekend building a side project with React and TypeScript. Love how the type safety makes refactoring so much easier! #WebDev #TypeScript",
      "Cloud computing has transformed how we build applications. Remember when we had to manage our own servers? #CloudComputing #DevOps",
    ],
  },
  {
    id: "motivation",
    name: "Motivation",
    tweets: [
      "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. #Motivation #Success",
      "Your time is limited, so don't waste it living someone else's life. Have the courage to follow your heart and intuition. #Inspiration",
      "The difference between who you are and who you want to be is what you do. Take action today! #Goals #Motivation",
    ],
  },
  {
    id: "humor",
    name: "Humor",
    tweets: [
      "I told my wife she was drawing her eyebrows too high. She looked surprised. #DadJokes",
      "Why don't scientists trust atoms? Because they make up everything! #ScienceHumor",
      "I'm on a seafood diet. I see food and I eat it. #FoodJokes #Humor",
    ],
  },
  {
    id: "business",
    name: "Business",
    tweets: [
      "The best entrepreneurs don't just solve problems—they anticipate them before they happen. #Business #Entrepreneurship",
      "Customer experience isn't just a department, it's everyone's job. #CustomerSuccess #Business",
      "The biggest risk is not taking any risk. In a world that's changing quickly, the only strategy guaranteed to fail is not taking risks. #BusinessStrategy",
    ],
  },
  {
    id: "health",
    name: "Health & Wellness",
    tweets: [
      "Your body hears everything your mind says. Stay positive. #Wellness #MentalHealth",
      "The greatest wealth is health. Take care of your body, it's the only place you have to live. #HealthyLiving",
      "Small daily improvements are the key to long-term health success. Just 1% better each day adds up! #HealthGoals #Wellness",
    ],
  },
];

export function TweetGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [generatedTweet, setGeneratedTweet] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleGenerateTweet = () => {
    if (!selectedCategory) return;

    const category = tweetCategories.find((cat) => cat.id === selectedCategory);
    if (!category) return;

    // Get a random tweet from the selected category
    const randomIndex = Math.floor(Math.random() * category.tweets.length);
    setGeneratedTweet(category.tweets[randomIndex]);

    // Trigger sparkle animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000); // Animation duration - shorter for subtlety
  };

  // Create sparkles
  const renderSparkles = () => {
    if (!isAnimating || !buttonRef.current) return null;

    const sparkles = [];
    const count = 30; // Medium number of sparkles

    // We'll position sparkles around the button edges

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 4 + 3; // Random size between 3-7px - medium size
      const duration = Math.random() * 0.5 + 0.5; // Random duration between 0.5-1.0s - shorter
      const delay = Math.random() * 0.2; // Random delay for staggered effect

      // Medium brightness colors
      const colors = [
        "#FFCC55", // Medium gold
        "#FF7799", // Medium pink
        "#66BBFF", // Medium blue
        "#AA99DD", // Medium purple
        "#77DDAA", // Medium green
        "#FFAA66", // Medium orange
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Position sparkles around the button border
      // Randomly choose which side of the button to start from
      let startPosition;
      let endPosition;

      // Determine starting position (on or near the button border)
      // Add more variety to starting positions - corners and edges
      const side = Math.floor(Math.random() * 8); // 0-1: top, 2-3: right, 4-5: bottom, 6-7: left

      switch (side) {
        case 0: // Top border - left half
          startPosition = {
            left: `${Math.random() * 50}%`,
            top: "0%",
          };
          endPosition = {
            x: (Math.random() - 0.8) * 100, // Mostly leftward
            y: -Math.random() * 60 - 20, // Always move upward from top
          };
          break;
        case 1: // Top border - right half
          startPosition = {
            left: `${50 + Math.random() * 50}%`,
            top: "0%",
          };
          endPosition = {
            x: (Math.random() + 0.3) * 100, // Mostly rightward
            y: -Math.random() * 60 - 20, // Always move upward from top
          };
          break;
        case 2: // Right border - top half
          startPosition = {
            left: "100%",
            top: `${Math.random() * 50}%`,
          };
          endPosition = {
            x: Math.random() * 60 + 20, // Always move rightward from right
            y: (Math.random() - 0.8) * 100, // Mostly upward
          };
          break;
        case 3: // Right border - bottom half
          startPosition = {
            left: "100%",
            top: `${50 + Math.random() * 50}%`,
          };
          endPosition = {
            x: Math.random() * 60 + 20, // Always move rightward from right
            y: (Math.random() + 0.3) * 100, // Mostly downward
          };
          break;
        case 4: // Bottom border - left half
          startPosition = {
            left: `${Math.random() * 50}%`,
            top: "100%",
          };
          endPosition = {
            x: (Math.random() - 0.8) * 100, // Mostly leftward
            y: Math.random() * 60 + 20, // Always move downward from bottom
          };
          break;
        case 5: // Bottom border - right half
          startPosition = {
            left: `${50 + Math.random() * 50}%`,
            top: "100%",
          };
          endPosition = {
            x: (Math.random() + 0.3) * 100, // Mostly rightward
            y: Math.random() * 60 + 20, // Always move downward from bottom
          };
          break;
        case 6: // Left border - top half
          startPosition = {
            left: "0%",
            top: `${Math.random() * 50}%`,
          };
          endPosition = {
            x: -Math.random() * 60 - 20, // Always move leftward from left
            y: (Math.random() - 0.8) * 100, // Mostly upward
          };
          break;
        case 7: // Left border - bottom half
        default:
          startPosition = {
            left: "0%",
            top: `${50 + Math.random() * 50}%`,
          };
          endPosition = {
            x: -Math.random() * 60 - 20, // Always move leftward from left
            y: (Math.random() + 0.3) * 100, // Mostly downward
          };
          break;
      }

      const style = {
        position: "absolute" as const,
        left: startPosition.left,
        top: startPosition.top,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: color,
        // No box-shadow for a cleaner look
        opacity: 0,
        zIndex: 1, // Above the button background but below the button content
        animation: `sparkle-${i} ${duration}s ease-out ${delay}s forwards`,
      };

      // Create a unique keyframe animation for each sparkle - simplified for subtlety
      const keyframes = `
        @keyframes sparkle-${i} {
          0% {
            transform: scale(0.5);
            opacity: 0.8;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translate(${endPosition.x * 0.7}px, ${
        endPosition.y * 0.7
      }px) scale(0.9);
            opacity: 0;
          }
        }
      `;

      sparkles.push(
        <React.Fragment key={i}>
          <style>{keyframes}</style>
          <div style={style} />
        </React.Fragment>
      );
    }

    return sparkles;
  };

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Tweet Generator
            </CardTitle>
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Select a Category
            </label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              {tweetCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          {generatedTweet && (
            <div className="mt-6 p-5 bg-muted rounded-lg border relative group">
              <p className="leading-relaxed pr-8">{generatedTweet}</p>
              <button
                className="absolute top-3 right-3 p-1.5 rounded-full bg-background/80 hover:bg-background transition-all duration-200 opacity-0 group-hover:opacity-100"
                onClick={() => {
                  navigator.clipboard.writeText(generatedTweet);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                title="Copy to clipboard"
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4 text-primary" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            ref={buttonRef}
            onClick={handleGenerateTweet}
            disabled={!selectedCategory}
            className="w-full relative overflow-visible z-10 hover:z-10"
          >
            {renderSparkles()}
            <span className="flex items-center justify-center gap-2 relative z-20">
              Generate Tweet
              <MessageSquare className="h-4 w-4" />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
