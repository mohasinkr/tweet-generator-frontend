import { useState, useRef } from "react";
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
import { fetchTweetFromAPI } from "@/services/api";
import { tweetCategories } from "@/data/categories";
import { Sparkles } from "@/components/ui/sparkles";

/**
 * Tweet Generator Component
 * Allows users to select a category and generate tweets via API
 */
export function TweetGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [generatedTweet, setGeneratedTweet] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /**
   * Handles the tweet generation process
   * Calls the API with the selected category and updates state
   */
  const handleGenerateTweet = async () => {
    if (!selectedCategory) return;
    
    // Reset states
    setError(null);
    setIsLoading(true);
    
    try {
      // Call API to get a tweet based on the selected category
      const tweet = await fetchTweetFromAPI(selectedCategory);
      setGeneratedTweet(tweet);
      
      // Trigger sparkle animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000); // Animation duration - shorter for subtlety
    } catch (err) {
      setError('Failed to generate tweet. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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

          {error && (
            <div className="mt-6 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
              <p>{error}</p>
            </div>
          )}
          
          {generatedTweet && !error && (
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
            disabled={!selectedCategory || isLoading}
            className="w-full relative overflow-visible z-10 hover:z-10"
          >
            <Sparkles isAnimating={isAnimating} buttonRef={buttonRef} />
            <span className="flex items-center justify-center gap-2 relative z-20">
              {isLoading ? "Generating..." : "Generate Tweet"}
              {!isLoading && <MessageSquare className="h-4 w-4" />}
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
