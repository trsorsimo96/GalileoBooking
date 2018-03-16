package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.EmailInBooking;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the EmailInBooking entity.
 */
public interface EmailInBookingSearchRepository extends ElasticsearchRepository<EmailInBooking, Long> {
}
