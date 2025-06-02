// Test Builder.io API connectivity via fetch
const BUILDER_API_KEY = '15b188fc9daf4dc5a37e11da13166d10';

async function testBuilderConnection() {
  try {
    console.log('Testing Builder.io API connection...');
    
    // Test direct API call for resultado-page
    console.log('Fetching resultado-page content via API...');
    const resultResponse = await fetch(`https://cdn.builder.io/api/v2/content/resultado-page?apiKey=${BUILDER_API_KEY}&limit=1`);
    const resultData = await resultResponse.json();
    console.log('Resultado page API response:', resultData);
    
    // Test direct API call for quiz-offer-page
    console.log('Fetching quiz-offer-page content via API...');
    const quizResponse = await fetch(`https://cdn.builder.io/api/v2/content/quiz-offer-page?apiKey=${BUILDER_API_KEY}&limit=1`);
    const quizData = await quizResponse.json();
    console.log('Quiz offer page API response:', quizData);
    
    if ((!resultData.results || resultData.results.length === 0) && 
        (!quizData.results || quizData.results.length === 0)) {
      console.warn('No content found for either model. Check Builder.io dashboard.');
      console.log('This means the pages need to be created in Builder.io first.');
    }
    
  } catch (error) {
    console.error('Builder.io test failed:', error);
  }
}

testBuilderConnection();
