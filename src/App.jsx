import { useMemo, useState } from 'react';

const PLATFORM_LIMITS = {
  twitter: 280,
  linkedin: 3000,
};

function App() {
  const [platform, setPlatform] = useState('twitter');
  const [postText, setPostText] = useState('');

  const limit = PLATFORM_LIMITS[platform];
  const currentLength = postText.length;
  const isOverLimit = currentLength > limit;

  const statusText = useMemo(() => {
    if (isOverLimit) {
      return `Exceeded by ${currentLength - limit} characters`;
    }

    return `${limit - currentLength} characters remaining`;
  }, [currentLength, isOverLimit, limit]);

  return (
    <main className="composer-shell">
      <div className="composer-card">
        <h1>Post Composer</h1>

        <div className="platform-toggle" role="radiogroup" aria-label="Select social platform">
          <label className={platform === 'twitter' ? 'platform-option active' : 'platform-option'}>
            <input
              type="radio"
              name="platform"
              value="twitter"
              checked={platform === 'twitter'}
              onChange={(event) => setPlatform(event.target.value)}
            />
            Twitter
          </label>

          <label className={platform === 'linkedin' ? 'platform-option active' : 'platform-option'}>
            <input
              type="radio"
              name="platform"
              value="linkedin"
              checked={platform === 'linkedin'}
              onChange={(event) => setPlatform(event.target.value)}
            />
            LinkedIn
          </label>
        </div>

        <label htmlFor="post-text" className="sr-only">
          Post text
        </label>
        <textarea
          id="post-text"
          value={postText}
          onChange={(event) => setPostText(event.target.value)}
          placeholder="Write your post here..."
          rows={8}
          aria-invalid={isOverLimit}
        />

        <div className="meta-row">
          <span className={isOverLimit ? 'count error' : 'count'}>
            {currentLength}/{limit}
          </span>
          <span className={isOverLimit ? 'status error' : 'status'}>{statusText}</span>
        </div>

        {isOverLimit && (
          <p className="error-message" aria-live="polite">
            Your post exceeds the {platform === 'twitter' ? 'Twitter' : 'LinkedIn'} character limit.
          </p>
        )}
      </div>
    </main>
  );
}

export default App;
