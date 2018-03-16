package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.PhoneInBooking;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PhoneInBooking entity.
 */
public interface PhoneInBookingSearchRepository extends ElasticsearchRepository<PhoneInBooking, Long> {
}
