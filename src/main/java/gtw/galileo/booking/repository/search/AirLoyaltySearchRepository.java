package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.AirLoyalty;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the AirLoyalty entity.
 */
public interface AirLoyaltySearchRepository extends ElasticsearchRepository<AirLoyalty, Long> {
}
