using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReservationsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
      private readonly DataContext _context;

        public ReviewsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<List<Review>>> GetAllReviews(string query = "", string sortBy = "", int page = 1, int pageSize = 10)
        {

            var result = _context.Clients
                .Where(review =>
                    review.Id.ToString().Contains(query));

            switch (sortBy)
            {
                case "creationDateAsc":
                    result = result.OrderBy(review => review.CreationDate);
                    break;
                case "creationDateDesc":
                    result = result.OrderByDescending(review => review.CreationDate);
                    break;
                default:
                    result = result.OrderBy(review => review.Id);
                    break;
            }

            result = result.Skip((page - 1) * pageSize).Take(pageSize);
            var review = await result.ToListAsync();
            return Ok(result);

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetSingleReviews(int id)
        {
            if (_context.Reviews == null)
            {
                return NotFound();
            }
            var reviews = await _context.Reviews
                .Include(reviews => reviews.Title)
                .Include(reviews => reviews.Description)
                .Include(reviews => reviews.Rating)
                .Include(reviews => reviews.RoomType)
                .FirstOrDefaultAsync(review => review.Id == id);

            if (reviews is null)

                return NotFound("Review not found. ");
                return Ok(reviews);
        }

        

        [HttpPut]
        public async Task<ActionResult<List<Review>>> UpdateReview(Review updatedReview)
        {

            var review = await _context.Reviews
                .Include(review => review.Title)
                .Include(review => review.Description)
                .Include(review => review.RoomType)
                .FirstOrDefaultAsync(rev => rev.Id == updatedReview.Id);
            if (review is null)
                return NotFound("Review not found.");
            review.Rating = updatedReview.Rating;
            await _context.SaveChangesAsync();
            return Ok(review);

        }

        [HttpPost]
        public async Task<ActionResult<Review>> CreateReview(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            return Ok(review);
        }

        // DELETE:
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)

                return NotFound("Review not found. ");
            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ReviewsExists(int id)
        {
            return (_context.Reviews?.Any(e => e.Id == id)).GetValueOrDefault();
        }

    }
}

/* 

*/
